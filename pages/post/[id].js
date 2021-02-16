
const Post = ({id, title, body}) => {
    return (
      <div>
        <div>{id}</div>
            <div>{title}</div>
            <div>{ body}</div>
      </div>
    );
}

export default Post


export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const pages = await res.json();

    const paths = pages.map(page => {
        return (
            {
                params: {
                    id: page.id.toString()
                }
            }
        )
    })


    return ({
        paths,
        fallback: false
    })

}


export const getStaticProps = async ({params}) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const values = await res.json();

    const requiredData = values.find(val => val.id.toString() === params.id)


    return {
        props: {
            id: requiredData.id,
            title: requiredData.title,
            body: requiredData.body,
        }
    }

}