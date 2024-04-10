import React from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {

  const { t, i18n } = useTranslation();
  const handleNameChange = () => {
    if (i18n.language == 'en') {
      i18n.changeLanguage('pl');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return <div>{t('test.hello')}
    <button onClick={handleNameChange}>{'Change lang'}</button></div>;
};

export default App;

