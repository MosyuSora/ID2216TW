import React from 'react';
import { Summary } from '../reactjs/summaryPresenter';
import { reactiveModel } from '../mobxReactiveModel';

export default function SummaryPage() {
  return (
    <Summary model={reactiveModel} />
  );
}
