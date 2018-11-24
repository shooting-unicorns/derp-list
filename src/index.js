// @flow

import React, { type Element, Fragment } from 'react';
import Loads from 'react-loads';

type Props = {
  contextKey?: string,
  dataRenderer: ({ items: Array<Object> }) => Element<any>,
  emptyRenderer?: () => Element<any>,
  errorRenderer?: ({ error: Object }) => Element<any>,
  loadData: Function,
  loadMoreRenderer: ({ isLoading: boolean, loadMore: Function }) => Element<any>,
  pageCount?: number,
  items?: Array<Object>
};

type State = {
  currentPage: number,
  items: Array<Object>,
  pageCount: number
};

export default class DataList extends React.Component<Props, State> {
  static defaultProps = {
    contextKey: null,
    emptyRenderer: () => null,
    errorRenderer: () => null,
    pageCount: 1,
    items: []
  };

  state = { currentPage: 1, pageCount: this.props.pageCount || 1, items: this.props.items || [] };

  getData = async () => {
    const { loadData } = this.props;
    const { currentPage, items } = this.state;
    const data = await loadData({ page: currentPage });
    const newItems = [...items, ...data.items];

    this.setState({ items: newItems, pageCount: data.pageCount });
  };

  getMoreData = ({ getData }: { getData: Function }) => { // eslint-disable-line
    const { currentPage } = this.state;

    this.setState({ currentPage: currentPage + 1 }, () => getData());
  };

  render = () => {
    const { contextKey, dataRenderer, emptyRenderer, errorRenderer, loadMoreRenderer } = this.props;
    const { currentPage, pageCount } = this.state;
    return (
      <Loads contextKey={contextKey} loadOnMount load={this.getData}>
        <Loads.Loading or={[Loads.Idle, Loads.Success]}>
          {({ isLoading, response: items, load }) => (
            <Fragment>
              {dataRenderer({ isLoading, items: items || this.state.items })}
              {!isLoading && items && items.length === 0 && emptyRenderer()}
              {currentPage < pageCount && (
                <Fragment>
                  {loadMoreRenderer({ isLoading, loadMore: () => this.getMoreData({ getData: load }) })}
                </Fragment>
              )}
            </Fragment>
          )}
        </Loads.Loading>
        <Loads.Error>
          {({ isError, error }) => <Fragment>{isError && errorRenderer && errorRenderer({ error })}</Fragment>}
        </Loads.Error>
      </Loads>
    );
  };
}
