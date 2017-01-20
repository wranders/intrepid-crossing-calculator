import 'isomorphic-fetch';

export function textChanged(text) {
    return dispatch => {
        dispatch(recievedResponse([]));
        dispatch(fetching(true));
        fetch("/api/item",{
            method: "POST",
            body: JSON.stringify({ data: text }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            })
        }).then(result => {
            result.json().then(json => {
                dispatch(fetching(false));
                dispatch(recievedResponse(json))
            });
        });
    }
}

export function recievedResponse(data) {
    return {
        type: "result",
        data: data
    }
}

export function fetching(isFetching) {
    return {
        type: "fetching",
        fetching: isFetching
    }
}