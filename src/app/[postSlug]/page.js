import React from 'react';
import dynamic from 'next/dynamic'

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

const CodeSnippet = dynamic(() => import('@/components/CodeSnippet'))
const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'))

const components = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
}

export async function getData(postSlug) {
  return loadBlogPost(postSlug)
}

async function BlogPost({ params: { postSlug } }) {
  const { content, frontmatter } = await getData(postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}

export async function generateMetadata({ params: { postSlug } }) {
  const { frontmatter: { title, abstract } } = await getData(postSlug)

  return {
    title: `${BLOG_TITLE} - ${title}`,
    description: abstract,
  }
}

export default BlogPost;
