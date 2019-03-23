export function dispatchThunk(RSAA) {
    return async (dispatch) => {
        const actionResponse = await dispatch(RSAA);

        if (actionResponse.error) {
            console.error(actionResponse.payload);
        }

        return actionResponse;
    };
}
