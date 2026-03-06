import React from 'react';
import { Search } from '../reactjs/searchPresenter';
import { reactiveModel } from '../mobxReactiveModel';

export default function SearchPage() {
  return (
    <Search model={reactiveModel} />
  );
}
