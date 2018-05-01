import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import styles from './PageHeaderLayout.less'

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div className={wrapperClassName}>
    {top}
    {console.log(restProps)}
    <PageHeader key='pageheader' {...restProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
)
