// @flow

import React, { Component } from 'react';
import Loads from 'react-loads';

type Props = {
  contextKey?: string,
  dataRenderer: ({ items: Array<Object> }) => Element<any>,
  errorRenderer?: ({ error: Object }) => Element<any>,
  loadingRenderer?: () => Element<any>,
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

class DerpList extends Component<Props, State> {
  static defaultProps = {
    contextKey: null,
    errorRenderer: () => null,
    loadingRenderer: () => null,
    pageCount: 1,
    items: []
  };

  state = { currentPage: 1, pageCount: this.props.pageCount || 1, items: this.props.items || [] };

  getData = async () => {
    const { loadData } = this.props;
    const { currentPage } = this.state;
    const data = await loadData({ page: currentPage });
    const items = [...this.state.items, ...data.items];
    this.setState({ items, pageCount: data.pageCount });

    return items;
  };

  getMoreData = ({ getData }: { getData: Function }) => { // eslint-disable-line
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 }, () => getData());
  };

  render = () => {
    const { contextKey, dataRenderer, errorRenderer, loadingRenderer, loadMoreRenderer } = this.props;
    const { currentPage, pageCount } = this.state;
    return (
      <Loads contextKey={contextKey} loadOnMount fn={this.getData}>
        {({ load, response: items, error, isError, isIdle, isLoading, isSuccess }) => (
          <div>
            {isSuccess && dataRenderer({ items: items || this.state.items })}
            {(isIdle || isLoading) && loadingRenderer && loadingRenderer()}
            {isError && errorRenderer && errorRenderer({ error })}
            {currentPage < pageCount && (
              <div>{loadMoreRenderer({ isLoading, loadMore: () => this.getMoreData({ getData: load }) })}</div>
            )}
          </div>
        )}
      </Loads>
    );
  };
}

export default DerpList;
