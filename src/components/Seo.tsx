import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export const Seo = (props: { title: string }) => {
  const { title } = props;

  const fullTitle = title ? title + ' | Initial Template' : 'Initial Template';

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
