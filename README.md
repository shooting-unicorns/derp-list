# derp-list

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A React library for rendering a list of data like Google's mobile search results.

## Installation

```
npm install derp-list --save
```

or install with [Yarn](https://yarnpkg.com) if you prefer:

```
yarn add derp-list
```

## Usage


```js

getDummyData = async ({ page }: { page: number } = {}) => {
    const query = { page: page || 1 };
    const test = await getExamplePosts(query);

    return { items: test.data, pageCount: test.total_pages };
  };

```

```js
export default () => (
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
```

### contextKey

> `string`

DerpList uses ReactLoads which offers an unique identifier for caching responses. If the `contextKey` changes, then data will be fetched again.


### `children` Render Props
#### loadMoreRenderer

> `any`

Trigger to fetch more data from your paginated request

#### dataRenderer

> `any`

Renders when a response is received.

#### loadingRenderer

> `any`

Renders when data is loading.

#### errorRenderer

> `any`

Renders when an error has occured.






[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
