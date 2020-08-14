import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const SignoutBtn = () => (
  <div>
    <Button icon labelPosition='left' size='mini'>
      <Icon name='sign-out' />
      SignOut
    </Button>
  </div>
)

export default SignoutBtn