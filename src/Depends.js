import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Prompt,
    Redirect,
    Link,
    NavLink
  } from 'react-router-dom';
// import { browserHistory as history } from 'react-router';
import config from './Config.js';
import cx from 'classnames';
import joinURL from 'url-join';
import eventBus from './services/EventBus.js';
import logger from './services/DevLogger.js';

export { React, Suspense, Router, Route, Switch, Prompt, Redirect, Link, NavLink, config, cx, joinURL, eventBus, logger };