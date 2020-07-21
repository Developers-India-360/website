import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from '~components/common/state/definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const BaseTestsCard = ({
  fields = [],
  negative,
  negativeTestsField,
  pending,
  positive,
  positiveTestsField,
  stateSlug,
  title,
  totalTests,
  totalTestsField = 'totalTestResults',
}) => {
  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title={title}
      link={<Link to={`/data/state/${stateSlug}/tests`}>Historical data</Link>}
    >
      <CardBody>
        <Statistic title="Total tests" value={totalTests}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: totalTestsField,
              })
            }}
          />
        </Statistic>
        <Statistic title="Positive" value={positive}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: positiveTestsField,
              })
            }}
          />
        </Statistic>
        {pending && <Statistic title="Pending" value={pending} />}
        <Statistic title="Negative" value={negative}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: negativeTestsField,
              })
            }}
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

const TestsCard = ({
  stateSlug,
  negative,
  pending,
  totalTestResults,
  positive,
}) => (
  <BaseTestsCard
    fields={['negative', 'positive', 'totalTestResults']}
    negative={negative}
    negativeTestsField="negative"
    pending={pending}
    positive={positive}
    positiveTestsField="positive"
    stateSlug={stateSlug}
    title="Tests"
    totalTests={totalTestResults}
    totalTestsField="totalTestResults"
  />
)

const PCRTestsCard = ({
  stateSlug,
  totalTestsViral,
  positiveTestsViral,
  negativeTestsViral,
}) => (
  <BaseTestsCard
    fields={['negativeTestsViral', 'positiveTestsViral', 'totalTestsViral']}
    negative={negativeTestsViral}
    negativeTestsField="negativeTestsViral"
    positive={positiveTestsViral}
    positiveTestsField="positiveTestsViral"
    stateSlug={stateSlug}
    title="Tests (PCR)"
    totalTests={totalTestsViral}
    totalTestsField="totalTestsViral"
  />
)

export { TestsCard, PCRTestsCard }