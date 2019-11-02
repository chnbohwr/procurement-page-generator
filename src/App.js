import React, { useState } from 'react';
import { Container, Box, TextField } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { upperCaseFirstChar, generateFakeData, generateResource, generateActions, generateEpic, generateReducer, generateContainer, generateColumns } from './codeGen';


function App() {
  const [databaseName, setDatabaseName] = useState('DieCutCleanSheet');
  const [containerName, setContainerName] = useState('TypePrice');
  const [getApiName, setGetApiName] = useState('getTypePrice');
  const [getApiUrl, setGetApiUrl] = useState('/database/diecut/typePrice');
  const [getApiJson, setGetApiJson] = useState('{\r\n"date": {},\r\n "typePrice": []\r\n}');
  const [putApiName, setPutApiName] = useState('putTypePrice');
  const [putApiUrl, setPutApiUrl] = useState('/database/diecut/modify/typePrice');

  const uperCaseDatabaseName = upperCaseFirstChar(databaseName);
  const uperCaseContainerName = upperCaseFirstChar(containerName);
  return (
    <Container>
      <h1>Code Generator</h1>
      <Box>
        <TextField id="input-database" label="Database" value={databaseName} onChange={e => setDatabaseName(e.target.value)} margin="normal" />
        <TextField id="input-containername" label="Container Name" value={containerName} onChange={e => setContainerName(e.target.value)} margin="normal" />
      </Box>
      <Box>
        <TextField id="input-getapiname" label="Get API Name" value={getApiName} onChange={e => setGetApiName(e.target.value)} margin="normal" />
        <TextField style={{ width: 400 }} id="input-getapiurl" label="Get API URL" value={getApiUrl} onChange={e => setGetApiUrl(e.target.value)} margin="normal" />
        <TextField id="input-getapijson" label="Get API JSON" value={getApiJson} onChange={e => setGetApiJson(e.target.value)} multiline rows={5} fullWidth margin="normal" />
      </Box>
      <Box>
        <TextField id="input-putapiname" label="PUT API Name" value={putApiName} onChange={e => setPutApiName(e.target.value)} margin="normal" />
        <TextField style={{ width: 400 }} id="input-putapiurl" label="PUT API URL" value={putApiUrl} onChange={e => setPutApiUrl(e.target.value)} margin="normal" />
      </Box>
      <Box>
        <h3>frontEnd/src/apis/fakeData/Fake{uperCaseDatabaseName}Data.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateFakeData(getApiName, getApiJson)}
        </SyntaxHighlighter>
      </Box>

      <Box>
        <h3>frontEnd/src/apis/resource/DatabaseResources/{uperCaseDatabaseName}Resource.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateResource({ databaseName, getApiName, getApiUrl, putApiName, putApiUrl })}
        </SyntaxHighlighter>
      </Box>
      <Box>
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseDatabaseName}Actions.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateActions({ databaseName, getApiName, putApiName, })}
        </SyntaxHighlighter>
      </Box>

      <Box>
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseDatabaseName}Epics.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateEpic({ databaseName, getApiName, putApiName, })}
        </SyntaxHighlighter>
      </Box>

      <Box>
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseDatabaseName}Reducer.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateReducer({ databaseName, getApiName, containerName, })}
        </SyntaxHighlighter>
      </Box>

      <Box>
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseContainerName}/{uperCaseContainerName}.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {
            generateContainer({ databaseName, containerName, getApiName, putApiName })
          }
        </SyntaxHighlighter>
      </Box>

      <Box>
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseContainerName}/ColumnSetting.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateColumns({ databaseName, getApiName, containerName, })}
        </SyntaxHighlighter>
      </Box>
    </Container>
  );
}

export default App;
