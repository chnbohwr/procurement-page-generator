import React, { useState } from 'react';
import { Container, Box, TextField } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { upperCaseFirstChar } from './CodeGen/utils';
import { generateFakeData, generateResource } from './CodeGen/genResource';
import generateRedux from './CodeGen/genRedux';
import { generateContainer, generateSideTable, generateColumns } from './CodeGen/DoubleColumn';

function Col2() {
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
      <h1>Code Generator Double Columns</h1>
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
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseDatabaseName}Redux.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateRedux({ databaseName, getApiName, putApiName, containerName})}
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

      <Box>
        <h3>frontEnd/src/features/Database/ME/{uperCaseDatabaseName}/{uperCaseContainerName}/SideTable.js</h3>
        <SyntaxHighlighter language="javascript" style={docco}>
          {generateSideTable({ databaseName, getApiName, containerName, })}
        </SyntaxHighlighter>
      </Box>
    </Container>
  );
}

export default Col2;
