import 'isomorphic-fetch';

export function textChanged(text) {
    return dispatch => {
        dispatch(recievedResponse({ results: [] }));
        dispatch(fetching(true));
        fetch("/api/item", {
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
    };
}

export function showCreateContractModal() {
    return {
        type: "createContractModal",
        visible: true
    };
}

export function hideCreateContractModal() {
    return {
        type: "createContractModal",
        visible: false
    };
}

export function toastHidden() {
    return {
        type: "toast",
        data: {
            visible: false,
            text: '',
            status: 'ok'
        }
    };
}

export function showToast(data) {
    return {
        type: "toast",
        data: data
    };
}

export function recievedResponse(data) {
    return {
        type: "result",
        data: data
    };
}

export function fetching(isFetching) {
    return {
        type: "fetching",
        fetching: isFetching
    };
}