import React from 'react';
import { Details } from '../reactjs/detailsPresenter';
import { reactiveModel } from '../mobxReactiveModel';

export default function DetailsPage() {
  return (
    <Details model={reactiveModel} />
  );
}
