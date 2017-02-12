import React, { Component, PropTypes } from 'react'; 
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router'


class CreatePost extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    
    onSubmit(props){// this props is properties from form not component props
        this.props.createPost(props)
            .then(() => {
                // Blog post has been created.. navigate the user to the index.
                // We navigate by calling this.context.router.push
                // with the new path to navigate
                this.context.router.push('/');
            })
    }

    render(){
        const { fields: { title, categories, content }, handleSubmit } = this.props;
        // equallent to const handleSubmit = this.props.handleSubmit
        // first part is equallant to const title = this.props.fields.title;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Conetent</label>
                    <textarea className="form-control" {...content}/>
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancle</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.title){
        errors.title = 'Enter a username'
    }
    if(!values.categories){
        errors.categories = 'Enter a category'
    }
    if (!values.content){
        errors.content = 'Enter some Content'
    }

    return errors;
}

/*
connect first argument is mapstate to props and second
one is mapDispatchtoProps 
reduxForm first argument is form config second is
mapStateToProps and third is mapDispathcToProps

*/
export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(CreatePost);