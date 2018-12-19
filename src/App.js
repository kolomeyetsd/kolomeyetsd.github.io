//
import React, { Component } from 'react'
import { HashRouter, NavLink, Route } from 'react-router-dom'

import data from './data.json'

const BASE_FONT_SIZE = 10
const ADD_FONT_SIZE = 25
const SENTIMENT_TYPES = ['positive', 'negative', 'neutral']


export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tags: data,
      maxSentiment: Math.max(...data.map(tag => tag.sentimentScore))
    }
  }

  render () {
    return (
      <HashRouter hashType="noslash">
        <div className="app">
          <div className="tags-side">
            {this.state.tags.map(tag => (
              <Tag
                key={tag.id}
                model={tag}
                maxSentiment={this.state.maxSentiment}
              />
            ))}
          </div>
          <div className="description-side">
            <Route
              path="/"
              exact={true}
              render={props => (
                <span>no selected tag</span>
              )}
            />
            <Route
              path="/:id+"
              render={props => (
                <Description
                  model={this.state.tags.find(tag => tag.id === props.match.params.id)}
                />
              )}
            />
          </div>
        </div>
      </HashRouter>
    )
  }
}

const Tag = props => {
  const fontSize = BASE_FONT_SIZE + Math.round(props.model.sentimentScore / props.maxSentiment * ADD_FONT_SIZE)

  return (
    <NavLink
      activeClassName="tag-active"
      className="tag"
      to={`/${props.model.id}`}
      style={{ fontSize }}>
      {props.model.label}
    </NavLink>
  )
}




const Description = props => {
  const { model } = props

  const totalMentions = SENTIMENT_TYPES.reduce((total, type) => model.sentiment[type] || 0, 0)
  const pageTypes = Object
    .entries(model.pageType)
    .filter(([ key, val ]) => val > 0)
    .reduce((out, [ key, val ]) => [ ...out, { name: key, value: val } ], [])
    .sort((a, b) => b.value - a.value)

  return (
    <div className="description">
      <span className="label">{model.label}</span>
      <ul>
        <li>
          {`total mentions: ${totalMentions}`}
        </li>
        <li>
          {`positive mentions: ${model.sentiment.positive || 'none'}`}
        </li>
        <li>
          {`neutral mentions: ${model.sentiment.neutral || 'none'}`}
        </li>
        <li>
          {`negative mentions: ${model.sentiment.negative || 'none'}`}
        </li>
        <li>
          <span>page types</span>
          <ul>
            {pageTypes.map(type => (
              <li key={type.name}>
                {`${type.name}: ${type.value}`}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
