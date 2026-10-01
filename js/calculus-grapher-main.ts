// Copyright 2015-2026, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Brandon Li
 */

// Must be first: sets Kantumruy Pro before any PhetFont is constructed at import time.
import './applyKantumruyFontFamily.js';

import { CreditsData } from '../../joist/js/CreditsNode.js';
import localeProperty from '../../joist/js/i18n/localeProperty.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import { combineOptions } from '../../phet-core/js/optionize.js';
import Tandem from '../../tandem/js/Tandem.js';
import AdvancedScreen from './advanced/AdvancedScreen.js';
import CalculusGrapherFluent from './CalculusGrapherFluent.js';
import CalculusGrapherSimulationPreferencesNode from './common/view/preferences/CalculusGrapherSimulationPreferencesNode.js';
import createLanguageSwitch from './createLanguageSwitch.js';
import DerivativeScreen from './derivative/DerivativeScreen.js';
import IntegralScreen from './integral/IntegralScreen.js';
import LabScreen from './lab/LabScreen.js';

const credits: CreditsData = {
  leadDesign: 'Amanda McGarry, Catherine Carter',
  softwareDevelopment: 'Martin Veillette, Chris Malley (PixelZoom, Inc.), Brandon Li',
  team: 'Michael Dubson, Ariel Paul, Kathy Perkins, Taliesin Smith',
  qualityAssurance: 'Jaron Droder, Emily Miller, Matthew Moore, Liam Mulhall, Valentina Pérez, Nancy Salpepi, Kathryn Woessner'
};

const simOptions: SimOptions = {
  credits: credits,
  preferencesModel: new PreferencesModel( {
    simulationOptions: {
      customPreferences: [ {
        createContent: tandem => new CalculusGrapherSimulationPreferencesNode( tandem.createTandem( 'content' ) )
      } ]
    }
  } ),
  phetioDesigned: true
};

const launchSimulation = (): void => {
  // Khmer is the default locale for this KruMath fork.
  localeProperty.value = 'km';

  const screens = [
    new DerivativeScreen( Tandem.ROOT.createTandem( 'derivativeScreen' ) ),
    new IntegralScreen( Tandem.ROOT.createTandem( 'integralScreen' ) ),
    new AdvancedScreen( Tandem.ROOT.createTandem( 'advancedScreen' ) ),
    new LabScreen( Tandem.ROOT.createTandem( 'labScreen' ) )
  ];

  const sim = new Sim(
    CalculusGrapherFluent[ 'calculus-grapher' ].titleStringProperty,
    screens,
    combineOptions<SimOptions>( {}, simOptions, {
      homeScreenWarningNode: createLanguageSwitch()
    } )
  );
  sim.start();
};

const kantumruyFont = new FontFace(
  'Kantumruy Pro',
  `url(${new URL( 'images/KantumruyProKhmer.woff2', window.location.href )})`,
  { weight: '100 900' }
);

kantumruyFont.load().then( loadedFont => {
  document.fonts.add( loadedFont );
  simLauncher.launch( launchSimulation );
} ).catch( error => {
  console.error( 'Unable to load Kantumruy Pro; using the default font.', error );
  simLauncher.launch( launchSimulation );
} );
