// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';
import request from './requests';

import DerpList from '../../src';

export const getExamplePosts = async (query: { page: Object }) =>
  request({ url: '/api/unknown', method: 'GET', params: query });

class Demo extends Component {
  getDummyData = async ({ page }: { page: number } = {}) => {
    const query = { page: page || 1 };
    const test = await getExamplePosts(query);

    return { items: test.data, pageCount: test.total_pages };
  };

  render() {
    return (
      <div>
        <h1>
          <a href="https://shooting-unicorns.com">
            Derp list demo
            <span role="img" aria-label="shooting unicorns">
              {' '}
              🦄
            </span>
          </a>
        </h1>
        <DerpList
          contextKey="items"
          loadData={this.getDummyData}
          loadMoreRenderer={({ loadMore, isLoading }) => (
            <div className="has-text-centered">
              <button onClick={loadMore}>Load more</button>
            </div>
          )}
          loadingRenderer={() => <div>loading...</div>}
          errorRenderer={({ error }) => <div>The following error has occured: {error}</div>}
          dataRenderer={({ items }) => (
            <div>
              {items && items.length === 0 ? (
                <div>
                  No results{' '}
                  <span role="img" aria-label="sad face">
                    😢
                  </span>
                </div>
              ) : (
                <div>
                  {items.map((item, index) => (
                    /* eslint-disable react/no-array-index-key */
                    <div key={index}>{item.name}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
