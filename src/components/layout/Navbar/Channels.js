import React from 'react';
import ChannelList from './ChannelList';
import PostChannel from './PostChannel';
import { connect } from 'react-redux';

function Channels({
    user: {
        authenticated,
        user: { displayName },
    },
}) {
    return (
        <>
            {authenticated ? (
                <>
                    <ChannelList />
                    <PostChannel displayName={displayName} />
                </>
            ) : (
                <p></p>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Channels);
