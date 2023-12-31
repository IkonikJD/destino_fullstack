import { PostCard, Categories, PostWidget, PostsTops } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections'

export default function Home({ posts }) {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.slug} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='relative lg:sticky lg:top-28'>
            <PostWidget />
            <PostsTops />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts },
  }
}
