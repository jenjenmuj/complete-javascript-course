import {elements} from './base';
import {limitRecipeTitle} from './searchView';

export const toggleLikeBtn = isLiked => {

    const iconString = isLiked ? `icon-heart` : `icon-heart-outlined`;
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};

export const toggleLikeMenuBtn = count => {
    elements.likesMenu.style.visibility = count > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}" data-likeid="${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${limitRecipeTitle(like.author)}</p>
            </div>
        </a>
    </li>
    `;
    elements.likes.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const like = document.querySelector(`.likes__link [href*=#${id}]`);
    if(like) like.parentElement.removeChild(like);
};
