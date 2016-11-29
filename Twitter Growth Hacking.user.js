// ==UserScript==
// @name         Twitter Growth Hacking
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world of twitter !
// @author       Volokasse
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    var l_FavButton = "<div id='growth_fav' style='margin: 10px; position: fixed; top: 50px; left: 0; z-index: 999999;' class='btn primary-btn' data-active='false'> Fav ! </div>";
    var l_FollowButton = "<div id='growth_follow' style='margin: 10px; position: fixed; top: 50px; left: 100px; z-index: 999999;' class='btn primary-btn' data-active='false'> Follow ! </div>";
    var l_CptFollow = 10;
    var l_CptFav = 0;
    var l_CptFw = 0;

    var IntFav = null;
    var l_ArrayFavs = [];

    var IntFw = null;
    var l_ArrayFollow = [];

    document.getElementsByTagName('body')[0].innerHTML = l_FavButton + l_FollowButton + document.getElementsByTagName('body')[0].innerHTML;

    /// Action for favs
    document.getElementById('growth_fav').addEventListener('click', function()
    {
        var l_Elem = document.getElementById('growth_fav');
        if (l_Elem.getAttribute('data-active') == 'true')
        {
            l_Elem.className = 'btn primary-btn';
            l_Elem.setAttribute('data-active', 'false');
            l_Elem.innerHTML = "Fav !";
            clearInterval(IntFav);
            return;
        }

        l_Elem.className = 'btn caution-btn';
        l_Elem.setAttribute('data-active', 'true');
        getAllVisibleFavsButtons();

        IntFav = setInterval(function()
        {
            if (l_ArrayFavs.length <= 0)
            {
                window.scrollTo(0, document.body.scrollHeight);
                getAllVisibleFavsButtons();
            }
            else
            {
                l_CptFav++;
                l_ArrayFavs.shift().click();
            }

            l_Elem.innerHTML = "Fav ! " + l_CptFav;
        }, 1000);
        return;
    });

    function getAllVisibleFavsButtons()
    {
        var l_Elems = Array.prototype.slice.call(document.querySelectorAll('button.js-actionFavorite:not(.ProfileTweet-actionButtonUndo)'));
        for (var l_Elem of l_Elems)
        {
            if (l_Elem.offsetWidth > 0 && l_Elem.offsetHeight > 0)
                l_ArrayFavs.push(l_Elem);
        }
    }

    document.getElementById('growth_follow').addEventListener('click', function()
    {
        var l_Elem = document.getElementById('growth_follow');
        if (l_Elem.getAttribute('data-active') == 'true')
        {
            l_Elem.className = 'btn primary-btn';
            l_Elem.setAttribute('data-active', 'false');
            l_Elem.innerHTML = "Follow !";
            clearInterval(IntFw);
            return;
        }

        l_Elem.className = 'btn caution-btn';
        l_Elem.setAttribute('data-active', 'true');
        getAllFollowInPage();

        IntFw = setInterval(function()
        {
            if (l_ArrayFollow.length <= 0)
            {
                window.scrollTo(0, document.body.scrollHeight);
                getAllFollowInPage();
            }
            else
            {
                l_CptFw++;
                l_ArrayFollow.shift().click();
            }

            l_Elem.innerHTML = "Follow ! " + l_CptFw;
        }, 1000);
        return;
    });

    function getAllFollowInPage()
    {
        var l_Elems = Array.prototype.slice.call(document.querySelectorAll('.not-following .user-actions-follow-button.js-follow-btn'));
        for (var l_Elem of l_Elems)
            l_ArrayFollow.push(l_Elem);
    }
})();