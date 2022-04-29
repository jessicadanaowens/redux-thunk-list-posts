import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component {
    // we don't need to fetch this here because we have a fetchPostsAndUserIds action creator
    // componentDidMount() {
    //     this.props.fetchUser(this.props.userId);
    // }

    render() {
        const { user } = this.props;

        if (!user) {
            return null;
        }

        return <div className="header">{user.name}</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find((user) => user.id === ownProps.userId )}
}

export default connect(mapStateToProps, )(UserHeader);