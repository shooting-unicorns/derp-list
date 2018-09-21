module.exports = {
  "extends": [
    "@medipass/react-medipass",
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "flowtype"
  ],
  "rules": {
    "comma-dangle": ["error", "never"],
    "jsx-a11y/href-no-hash": "off",
    "strict": 0,
    "react/default-props-match-prop-types": [
      1,
      {
        "allowRequiredDefaults": true
      }
    ]
  },
  "parser": "babel-eslint"
}

