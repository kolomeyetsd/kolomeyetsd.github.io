//
import React, { Component } from 'react'
import { HashRouter, NavLink, Route } from 'react-router-dom'

import data from './data.json'

const BASE_FONT_SIZE = 10
const ADD_FONT_SIZE = 25


const App = props => {
  const { tags, maxSentiment } = props

  return (
    <HashRouter hashType="noslash">
      <div className="app">
        <div className="tags-side">
          {tags.map(tag => (
            <Tag
              key={tag.id}
              model={tag}
              maxSentiment={maxSentiment}
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
              <Description model={tags.find(tag => tag.id === props.match.params.id)} />
            )}
          />
        </div>
      </div>
    </HashRouter>
  )
}


const Tag = props => {
  const { model, maxSentiment } = props
  const fontSize = BASE_FONT_SIZE + Math.round(model.sentimentScore / maxSentiment * ADD_FONT_SIZE)

  return (
    <NavLink activeClassName="tag-active" className="tag" to={`/${model.id}`} style={{ fontSize }}>
      {props.model.label}
    </NavLink>
  )
}


const Description = props => {
  const { model } = props

  const totalMentions = Object
    .entries(model.sentiment)
    .reduce((total, [ key, val ]) => total + val, 0)

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


export default props => (
  <App
    tags={data}
    maxSentiment={Math.max(...data.map(tag => tag.sentimentScore))}
  />
)
