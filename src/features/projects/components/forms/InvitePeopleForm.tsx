import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import Input from '@/components/inputs/Input';
import FormInputBox from '@/components/inputs/FormInputBox';
import Select from '@/components/select/Select';

import type { ProjectRole } from '@/lib/services/invitations/types';

interface InvitePeopleFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  role: ProjectRole;
  onRoleChange: (value: ProjectRole) => void;
  isInviting: boolean;
  onSubmit: () => void;
}

const InvitePeopleForm = ({
  email,
  onEmailChange,
  role,
  onRoleChange,
  isInviting,
  onSubmit,
}: InvitePeopleFormProps) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Text variant="h2">Invite people</Text>
        <Text variant="body-sm" className="text-ink-3">
          Invite someone to collaborate on this project.
        </Text>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-wrap items-end gap-2"
      >
        <FormInputBox label="Email address" className="min-w-0 flex-1">
          <Input
            value={email}
            onChange={onEmailChange}
            placeholder="name@thealteroffice.com"
            className="w-full"
            autoFocus
          />
        </FormInputBox>

        <FormInputBox label="Project role">
          <Select
            value={role}
            onChange={(value) => {
              if (value) onRoleChange(value as ProjectRole);
            }}
            options={[
              { label: 'Member', value: 'member' },
              { label: 'Admin', value: 'admin' },
            ]}
            searchable={false}
          />
        </FormInputBox>

        <Button type="submit" variant="primary" disabled={isInviting || !email.trim()}>
          <Text variant="body-sm" className="font-medium">
            {isInviting ? 'Sending...' : 'Invite'}
          </Text>
        </Button>
      </form>
    </section>
  );
};

export default InvitePeopleForm;
