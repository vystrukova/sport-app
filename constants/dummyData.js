import images from "./images"
import icons from "./icons"

const trendingRecipes = [
    {
        id: 1,
        name: "Потеря веса",
        image: images.spagetti,
        duration: "10 мин",
        serving: 1,
        isBookmark: false,
        category: "Lose Weight",
        author: {
            profilePic: images.UserProfile5,
            name: "Хлоя Тинг",
        },
        ingredients: [
            {
                id: 1,
                description: "Берпи",
                quantity: "120 сек"
            },
            {
                id: 2,
                description: "Альпинист",
                quantity: "90 сек"
            },
            {
                id: 3,
                description: "Приседания",
                quantity: "120 сек"
            },
            {
                id: 4,
                description: "Планка",
                quantity: "90 сек"
            },
            {
                id: 5,
                description: "Велосипед",
                quantity: "120 сек"
            },
            {
                id: 6,
                description: "Отжимания + Альпинист",
                quantity: "90 сек"
            },

        ],

    },

    {
        id: 2,
        name: "Пресс",
        image: images.pamelareif,
        duration: "10 мин",
        serving: 1,
        isBookmark: false,
        category: "abs",
        author: {
            profilePic: images.UserProfile5,
            name: "Pamela Reif",
        },
        ingredients: [
            {
                id: 1,
                description: "Планка со скручиваниями",
                quantity: "90 сек"
            },
            {
                id: 2,
                description: "Штопор",
                quantity: "60 сек"
            },
            {
                id: 3,
                description: "Планка",
                quantity: "60 сек"
            },
            {
                id: 4,
                description: "Планка Человек паук",
                quantity: "90 сек"
            },
            {
                id: 5,
                description: "Выпады в сторону (правая нога)",
                quantity: "60 сек"
            },
            {
                id: 6,
                description: "Выпады в сторону (левая нога)",
                quantity: "60 cек"
            },

        ],

    },

    {
        id: 3,
        name: "Тренировка верхнего пресса",
        image: images.growwithannas,
        duration: "10 мин",
        serving: 1,
        isBookmark: true,
        category: "abs",
        author: {
            profilePic: images.UserProfile9,
            name: "Grow With Anna",
        },
        ingredients: [
            {
                id: 1,
                description: "Отжимания + Альпинист",
                quantity: "90 сек"
            },
            {
                id: 2,
                description: "Планка",
                quantity: "60 сек"
            },
            {
                id: 3,
                description: "Альпинист",
                quantity: "120 сек"
            },
            {
                id: 4,
                description: "Берпи",
                quantity: "90 сек"
            },
            {
                id: 5,
                description: "Велосипед",
                quantity: "60 сек"
            },
            {
                id: 6,
                description: "Приседания",
                quantity: "120 сек"
            },


        ],
    },
    {
        id: 4,
        name: "Sami Clarke",
        image: images.samiclarke,
        duration: "10 мин",
        serving: 1,
        isBookmark: true,
        category: "Lose Weight",
        author: {
            profilePic: images.UserProfile7,
            name: "Ab Workout // No Equipment",
        },
        ingredients: [
            {
                id: 1,
                description: "Нижний пресс",
                quantity: "90 сек"
            },
            {
                id: 2,
                description: "Скручивания",
                quantity: "90 сек"
            },
            {
                id: 3,
                description: "Русская рулетка",
                quantity: "120 сек"
            },
            {
                id: 4,
                description: "Велосипед",
                quantity: "90 сек"
            },
            {
                id: 5,
                description: "Планка",
                quantity: "60 сек"
            },


        ],

    },

]

const categories = trendingRecipes

export default {
    trendingRecipes,
    categories
}