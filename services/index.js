import { request, gql } from 'graphql-request'

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          cursor
          node {
            author {
              description
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            exceprt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
        posts {
          id
        }
      }
    }
  `
  const result = await request(graphqlAPI, query)

  // Ordenar las categorías por el número de posts en orden descendente
  const sortedCategories = result.categories.sort(
    (a, b) => b.posts.length - a.posts.length
  )

  // Tomar solo las 5 primeras categorías
  const topCategories = sortedCategories.slice(0, 3)

  return topCategories
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          description
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        exceprt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })

  return result.post
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug, createdAt })

  return { next: result.next[0], previous: result.previous[0] }
}

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              description
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            exceprt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getPopularPosts = async () => {
  const postsQuery = gql`
    query GetPopularPosts {
      posts {
        title
        featuredImage {
          url
        }
        createdAt
        slug
        comments {
          id
        }
      }
    }
  `
  const postsResult = await request(graphqlAPI, postsQuery)

  const posts = postsResult.posts

  // Obtener el recuento de comentarios para cada post
  const postsWithCommentCount = posts.map((post) => {
    return {
      ...post,
      commentCount: post.comments.length,
    }
  })

  // Ordenar los posts por el número de comentarios en orden descendente
  const sortedPosts = postsWithCommentCount.sort(
    (a, b) => b.commentCount - a.commentCount
  )

  // Tomar solo los 5 primeros posts
  const popularPosts = sortedPosts.slice(0, 3)

  return popularPosts
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })

  return result.comments
}

export const getFeaturedNoticies = async () => {
  const query = gql`
    query GetNoticies() {
      posts(where: {categories_some: {slug: "noticies"}}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCtaegoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getSearch = async (searchTerm) => {
  const query = gql`
    query GetSearch {
      posts {
        author {
          description
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        exceprt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          text
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  const filteredPosts = result.posts.filter((post) => {
    const content = post.content.text.toLowerCase()
    return searchTerm
      .split(' ')
      .every((term) => content.includes(term.toLowerCase()))
  })

  return filteredPosts
}
