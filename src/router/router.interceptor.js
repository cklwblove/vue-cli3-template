import router from './.invoke/router';
import { clearPending } from 'services/pending';

router.beforeEach((to, from, next) => {
  clearPending();
  next();
});
