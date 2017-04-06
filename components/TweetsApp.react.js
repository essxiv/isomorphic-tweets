module.exports = TweetsApp = React.createClass({
    console.log("<-- This is the TweetsApp File -->")
    getInitialState: function(props) {
        props = props || this.props
        console.log('This TweetsApp props: ', props)

        return {
            tweets: props.tweets,
            count: 0,
            page: 0,
            paging: false,
            skip: 0,
            done: false
        }
    },

    componentWillReceiveProps: function(newProps, oldProps) {
        this.setState(this.getInitialState(newProps))
    },

    componentDidMount: function() {
        var self = this
        var socket = io.connect()

        socket.on('tweet', function(data) {
            self.addTweet(data)
        })

        window.addEventListener('scroll', this.checkWindowScroll)
    },

    addTweet: function(tweet) {
        var updated = this.state.tweets
        var count = this.state.count + 1
        var skip = this.state.skip + 1

        updated.unshift(tweet)
        this.setState({ tweets: updated, count: count, skip: skip })
    },

    showNewTweets: function() {
        var updated = this.state.tweets
        console.log(updated)

        updated.forEach(function(tweet) {
            console.log(tweet.active)
            tweet.active = true
        })
    }

    render: function() {
        return (
            <div className="tweets-app">
                <Tweets tweets={this.state.tweets} />
                <Loader paging={this.state.paging} />
                <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets} />
            </div>
        )
    }
})
