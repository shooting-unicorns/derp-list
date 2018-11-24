# derp-list 🤓🦄

A React library for rendering a list of data like Google search results.

![alt text](https://shooting-unicorns.com/images/derp-list-demo.gif "Derp list demo")

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

getRandomPosts = async ({ page }: { page: number } = {}) => {
    const query = { page: page || 1 };
    const randomPosts = await getExamplePosts(query);

    return { items: randomPosts.data, pageCount: randomPosts.total_pages };
};

```

```js
export default () => (
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
```

### contextKey

> `string`

DerpList uses ReactLoads which offers an unique identifier for caching responses. If the `contextKey` changes, then data will be fetched again.


### `children` Render Props
#### loadMoreRenderer

> `any`

Returns `isLoading` when data is fetching and `loadMore` function to fetch more data from your paginated request.

#### dataRenderer

> `any`

Returns `isLoading` when data is fetching and `items` when a response is received.

#### emptyRenderer

> `any`

Renders when no data is fetched.

#### errorRenderer

> `any`

Renders when an error has occured.






[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
