import { Button } from '@geist-ui/core';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { randomString } from '../config/functions';
import { HiTicket } from '../config/icons';

const CreateTicket = ({ btnType, activeCustomerObj }) => {
      const session = useSession();
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const supabase = useSupabaseClient();

      const createNewTicket = async () => {
            console.log('dd');
            if (session) {
                  setLoading(true);
                  const { id, idString } = activeCustomerObj;
                  const { data: newTicket, error } = await supabase
                        .from('tickets')
                        .upsert({ userId: id, id: randomString(6, '#') })
                        .select();
                  if (!error)
                        router.push(
                              `/dashboard/${idString}/${newTicket[0].id}`
                        );
                  setLoading(false);
            }
      };

      return (
            <Button
                  type={btnType}
                  scale={2 / 3}
                  icon={<HiTicket />}
                  width="235px"
                  loading={loading}
                  onClick={createNewTicket}
            >
                  Create a ticket to this customer
            </Button>
      );
};

export default CreateTicket;
