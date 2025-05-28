import { IonApp, setupIonicReact } from '@ionic/react';
import { MainScreen, PuzzlesScreen, ProfileStatisticsScreen, PuzzlesResultScreen, TechDevScreen, PlayerScreen } from './screens';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/custom.css';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css';

/* Theme variables */
import './theme/variables.css';
import { useTgUserInfo } from './hooks/useTgUserInfo';

setupIonicReact();

const App: React.FC = () => {
  useTgUserInfo();

  return (
    <IonApp>
      <Router>
        <Switch>
          <Route path="/puzzles/" component={() => <PuzzlesScreen isRating={false} />} />
          <Route path="/shared-puzzles/:id" component={() => <PuzzlesScreen isRating={false} />} />
          <Route path="/puzzles-rating" component={() => <PuzzlesScreen isRating={true} />} />
          <Route path="/profile-statistics" component={ProfileStatisticsScreen} />
          <Route path="/puzzles-result/:id" component={PuzzlesResultScreen} />
          <Route path="/tech-dev" component={TechDevScreen} />
          <Route path="/player" component={PlayerScreen} />
          <Route path="/" component={MainScreen} />
        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;
