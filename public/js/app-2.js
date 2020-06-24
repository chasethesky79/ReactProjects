
const Container = (props) => {
    return (
        <div className='container'>
            Children: {props.children}
        </div>
    )
};
const Article = (props) => {
    return (
        <div>
            <p>{props.headline}</p>
        </div>
    )
};
const NewsPaper = () => {
    return (
        <Container>
            <Article headline="An Interesting article">
                Content here
            </Article>
        </Container>
    )
};
ReactDOM.render(<NewsPaper/>, document.getElementById('content'));
