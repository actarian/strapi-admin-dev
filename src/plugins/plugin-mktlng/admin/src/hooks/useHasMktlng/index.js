import get from 'lodash/get';
import { useSelector } from 'react-redux';

const selectContentManagerListViewPluginOptions = state =>
  state['content-manager_listView'].contentType.pluginOptions;

const useHasMktlng = () => {
  const pluginOptions = useSelector(selectContentManagerListViewPluginOptions);

  return get(pluginOptions, 'mktlng.localized', false);
};

export default useHasMktlng;
