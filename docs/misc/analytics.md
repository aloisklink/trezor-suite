# Analytics

Both web and desktop Suite applications collect anonymous data about how a user interacts with them. Analytics is not mandatory and not all users have it enabled, as it can be opt-out during the onboarding process or later in the settings in the general tab. However, by default, it is enabled in the onboarding process and if the user does not opt-out, the application starts to track his interactions immediately after the onboarding process is completed.

## Anonymous data:

Collected data have to be anonymous. This means that Suite should never track any data leaking information about a device or a user.

-   device id
-   public keys
-   transaction id
-   ... any other fingerprinting

## Tracking process

Data about interactions are transferred in GET HTTP requests encoded in URI.

Data from **production** builds (codesign branch) are sent to:

-   Desktop build: https://data.trezor.io/suite/log/desktop/stable.log
-   Web build: https://data.trezor.io/suite/log/web/stable.log

Data from **development** and **localhost** builds are sent to:

-   Desktop build: https://data.trezor.io/suite/log/desktop/develop.log
-   Web build: https://data.trezor.io/suite/log/web/develop.log

List of available configured endpoints:

    https://data.trezor.io/suite/log    /desktop   /staging     .log
    https://data.trezor.io/suite/log    /desktop   /beta        .log
    https://data.trezor.io/suite/log    /desktop   /develop     .log
    https://data.trezor.io/suite/log    /desktop   /stable      .log
    https://data.trezor.io/suite/log    /web       /staging     .log
    https://data.trezor.io/suite/log    /web       /beta        .log
    https://data.trezor.io/suite/log    /web       /develop     .log
    https://data.trezor.io/suite/log    /web       /stable      .log

Example URI:

`https://data.trezor.io/suite/log/web/stable.log?c_v=1.8&c_type=transport-type&c_commit=4d09d88476dab2e6b2fbfb833b749e9ac62251c2&c_instance_id=qlT0xL2XKV&c_session_id=FZjilOYQic&c_timestamp=1624893047903&type=bridge&version=2.0.30`

Which tracks:

```
{
  c_v: '1.11',
  c_type: 'transport-type',
  c_commit: '4d09d88476dab2e6b2fbfb833b749e9ac62251c2',
  c_instance_id: 'qlT0xL2XKV',
  c_session_id: 'FZjilOYQic',
  c_timestamp: 1624893047903,
  type: 'bridge',
  version: '2.0.30'
}
```

Attributes which are always tracked:

-   **c_v**: version of analytics
-   **c_type**: type of tracked event
-   **c_commit**: current revision of app
-   **c_instance_id**: until user does not wipe storage, the id is still same
-   **c_session_id**: id changed on every launch of app
-   **c_timestamp**: time in ms when event is created (added in 1.11)

Other attributes are connected to a specific type of events.

Specific events can be found in `analyticsActions.ts` file and also in [company Notion](https://www.notion.so/satoshilabs/Data-analytics-938aeb2e289f4ca18f31b1c02ab782cb) where implemented events with expected attributes and other notes related to analytics can be found.

## Add/Modify event

In case a new event has to be added or an old one has to be modified, please follow the following subsections.

### What to track

Navigation between pages is not required to be tracked as it is tracked automatically by `router/location-change` event. However, a case when it is good to track it is when a user can get to the same location using different methods (e.g. two different buttons on the same page). All other user actions without sensitive info can be tracked. If you are in doubt, please contact our analyst.

### Type declaration

All events and their properties should be declared in `AnalyticsEvent` type in `analyticsActions.ts` file.

### Reporting in code

To report an event, use `useAnalytics` hook in your component and use its `report` method.

```
analytics.report({
    type: 'event',
    payload: {
        attribute: attributeValue,
    },
});
```

### Versioning

`version` variable in `analyticsActions.ts` file should be bumped (applies only if it has not yet been bumped in the current version of the app). Please follow simple semver versioning in format `<breaking-change>.<analytics-extended>`.
Breaking change should bump major version. Any other change bumps minor version.

### Changelog

Add a record of change to [Changelog](#Changelog) section in this file. Please use a format of previous records.

### Notion

Add event to the analytics overview in the [company Notion](https://www.notion.so/satoshilabs/Data-analytics-938aeb2e289f4ca18f31b1c02ab782cb)

## How does analytics work?

1. User with enabled analytics interacts with the application
2. Events are sent to specific endpoints
3. Collected data are parsed and analysed (can be seen in Keboola)
4. Charts and metrics are created (in Tableau)
5. We know how to improve the application

## How to check that events are tracked?

1. **Option**: Open DevTools, navigate to **Network tab**, filter traffic by `.log` and check the **Query String Parameters** section
2. **Option**: Get access to Keboola
3. **Option**: Create a modified build of app with an analytics server URL pointing to your server

## Changelog

### 1.16

Added:

-   device-setup-completed
    -   duration: number (in ms)
    -   device: 'T' | '1'
    -   firmware?: 'install' | 'update' | 'skip' | 'up-to-date' (empty if seed === 'recovery-in-progress')
    -   seed: 'create' | 'recovery' | 'recovery-in-progress'
    -   seedType?: 'standard' | 'shamir' (empty seed === 'recovery')
    -   recoveryType?: 'standard' | 'advanced' (empty if seed === 'create' || device === 'T')
    -   backup?: 'create' | 'skip' (empty if seed === 'recovery')
    -   pin: 'create' | 'skip'

Removed:

-   initial-run-completed (in favor of device-setup-completed, analytics/enable, and analytics/dispose)
-   suite-ready
    -   platform
    -   platformLanguage

### 1.15

Added:

-   suite-ready
    -   earlyAccessProgram: boolean
-   menu/goto/early-access
-   settings/general/early-access
    -   allowPrerelease: boolean
-   settings/general/early-access/check-for-updates
    -   checkNow: boolean
-   settings/general/early-access/download-stable
-   settings/general/goto/early-access
    -   allowPrerelease: boolean

### 1.14

Added:

-   accounts/status
    -   [symbol]\_[accountType]: number

Fixed:

-   suite-ready
    -   osName: android is now correctly detected, added chromeos

Removed:

-   account-create

### 1.13

Added:

-   switch-device/add-hidden-wallet

Changed:

-   wallet/created renamed to select-wallet-type

Removed:

-   desktop-init

### 1.12

Changed:

-   device-update-firmware
    -   toFwVersion and toBtcOnly made optional as we don't know them when installing custom firmware

Added:

-   guide/tooltip-link/navigation
    -   id: string

### 1.11

Added:

-   c_timestamp: number (time of created in ms sent with every event)
-   menu/settings/dropdown
    -   option: 'guide' (+ old ones)
-   menu/guide
-   guide/feedback/navigation
    -   type: 'overview' | 'bug' | 'suggestion'
-   guide/feedback/submit
    -   type: 'bug' | 'suggestion'
-   guide/header/navigation
    -   type: 'back' | 'close' | 'category'
    -   id?: string
-   guide/report
    -   type: 'overview' | 'bug' | 'suggestion'
-   guide/node/navigation
    -   type: 'category' | 'page'
    -   id: string

### 1.10

Removed:

-   initial-run-completed
    -   newDevice
    -   usedDevice

### 1.9

Changed:

-   use `stable.log` for codesign builds and `develop.log` otherwise
-   `suite-ready` is now also tracked on initial run

Added:

-   suite-ready
    -   platformLanguages: string
-   device-connect
    -   language: string
    -   model: string
-   settings/device/goto/background
    -   custom: boolean
-   settings/device/background
    -   image: string | undefined (gallery image)
    -   format: string | undefined (custom image)
    -   size: number | undefined (custom image)
    -   resolutionWidth: number | undefined (custom image)
    -   resolutionHeight: number | undefined (custom image)
-   add-token
    -   token: string
-   transaction-created
    -   action: 'sent' | 'copied' | 'downloaded' | 'replace'
    -   symbol: string
    -   tokens: string
    -   outputsCount: number
    -   broadcast: boolean
    -   bitcoinRbf: boolean
    -   bitcoinLockTime: boolean
    -   ethereumData: boolean
    -   rippleDestinationTag: boolean
    -   ethereumNonce: boolean
    -   selectedFee: string
-   menu/notifications/toggle
    -   value: boolean
-   menu/settings/toggle
    -   value: boolean
-   menu/settings/dropdown
    -   option: 'all' | 'general' | 'device' | 'coins'
-   menu/goto/tor
-   accounts/empty-account/receive

Fixed:

### 1.0 - 1.8

-   initial version (<1.8 events are discarded)
