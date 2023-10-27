import React from 'react';
import styles from './styles.module.css';

type Props = {
  className: string;
  children: string;
  mdxCode: (props: {
    className: string;
    children: string;
  }) => React.ReactElement;
};

const GraphiQL = ({ className, children, mdxCode }: Props) => {
  const optionsStr = className.replace(/^language-graphiql/, '');
  const options = JSON.parse(optionsStr);
  const api = options.api;
  console.log('🚀 ~ file: index.tsx:12 ~ GraphiQL ~ api:', api);
  const query = encodeURIComponent(children);
  return (
    <div>
      <div className={styles.playground}>
        <div className={styles.wrapper}>
          <iframe
            title="GraphiQL"
            width="100%"
            height="100%"
            src={`https://focusreactive.com/embed/graphiql/?api=${api}&query=${query}`}
          />
        </div>
      </div>
      <div className={styles.code}>
        {mdxCode({ className: 'language-graphql', children })}
      </div>
    </div>
  );
};

export default GraphiQL;
