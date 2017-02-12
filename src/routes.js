import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app';
import PostsIndex from './components/posts_index';
import CreatePost from './components/post_create';
import PostsShow from './components/posts_show';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={PostsIndex} />
        <Route path="/post/new" component={CreatePost} />
        <Route path="post/:id" component={PostsShow} />
    </Route>    
);
