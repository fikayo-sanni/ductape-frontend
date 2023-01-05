import { withNProgress } from '@tanem/react-nprogress'
import React from 'react'

import Bar from './bar'
import Container from './container'
import Spinner from './spinner'

const Progress = ({ isFinished, progress, animationDuration }) => (
  <Container animationDuration={animationDuration} isFinished={isFinished}>
    <Bar animationDuration={animationDuration} progress={progress} />
    <Spinner />
  </Container>
)

export default withNProgress(Progress)