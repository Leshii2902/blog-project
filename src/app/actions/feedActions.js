import axios from 'axios';

// получить выборку постов для автоподгрузки ленты
export function fetchFeedPostsSample(offset, value, user_id) {
    return {
        type: 'FETCH_FEED_POSTS_SAMPLE',
        payload: axios.get(`/api/posts/feed/?user_id=${user_id}&value=${value}&offset=${offset}`)
    }
}