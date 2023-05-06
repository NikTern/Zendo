import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_APIS } from '../../utils/mutations';

import { QUERY_USER_PREFERENCES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import { fetchPicApi1, fetchPicApi2, fetchPicApi3 } from '../utils/api';
import { fetchQuoteApi1, fetchQuoteApi2, fetchQuoteApi3 } from '../utils/api';
import { fetchVidApi1, fetchVidApi2, fetchVidApi3 } from '../utils/api';
