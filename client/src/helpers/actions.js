export function dispatchThunk(RSAA) {
    return async (dispatch) => {
        const actionResponse = await dispatch(RSAA);

        if (actionResponse.error) {
            throw new Error(actionResponse.payload);
        }

        return actionResponse;
    };
}
