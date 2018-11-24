// @flow

import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import request from './requests';
import DerpList from '../../src';

export const getExamplePosts = async (query: { page: Object }) =>
  request({ url: '/api/unknown', method: 'GET', params: query });

class Demo extends Component {
  getRandomPosts = async ({ page }: { page: number } = {}) => {
    const query = { page: page || 1 };
    const randomPosts = await getExamplePosts(query);

    return { items: randomPosts.data, pageCount: randomPosts.total_pages };
  };

  render() {
    return (
      <Fragment>
        <h1>
          Derp list demo
          <br />
          <a href="https://shooting-unicorns.com">
            A Google like data list!
            <span role="img" aria-label="shooting unicorns">
              🦄
            </span>
          </a>
        </h1>
        <DerpList
          contextKey="items"
          dataRenderer={({ isLoading, items }) => (
            <Fragment>
              {isLoading && items.length === 0 && <div>loading</div>}
              {items.map((item, index) => (
                /* eslint-disable react/no-array-index-key */
                <div key={index}>{item.name}</div>
              ))}
            </Fragment>
          )}
          emptyRenderer={() => <div>No items...</div>}
          errorRenderer={({ error }) => <div>The following error has occured: {error}</div>}
          loadData={this.getRandomPosts}
          loadMoreRenderer={({ isLoading, loadMore }) => (
            <Fragment>
              {isLoading && <div>loading...</div>}
              <button onClick={loadMore}>More results</button>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
