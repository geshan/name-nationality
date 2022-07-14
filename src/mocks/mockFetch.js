const nameNationalizeResponse = {
  name: 'john',
  country:[
    {
      country_id: 'US',
      probability: 0.048398225615958565
    },
    {
      country_id: 'IM',
      probability:0.04438246053773764
    },
    {
      country_id: 'IE',
      probability: 0.042102085396037124
    }
  ]
}

export default async function mockFetch(url) {
  if(url.startsWith('https://api.nationalize.io') && url.includes('john')) {
    return {
      ok: true,
      status: 200,
      json: async () => nameNationalizeResponse,
    };
  }
  
  throw new Error(`Unhandled request: ${url}`);        
}
