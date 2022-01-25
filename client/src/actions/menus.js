
export const collapseMenu = collapsed => dispatch => {
    try {
        if (collapsed) {
            dispatch({
                type: 'SHOW_CONTROLS'
            });
        } else {
            dispatch({
                type: 'HIDE_CONTROLS'
            })
        }
    } catch (error) {
        console.log(error.response.data);
    }
}