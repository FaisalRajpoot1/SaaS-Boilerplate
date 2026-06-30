import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/features/auth/schemas';
import { useForgotPassword } from '@/features/auth/use-auth-mutations';

export default function ForgotPasswordPage(): JSX.Element {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });
  const forgotMutation = useForgotPassword();

  const submit = form.handleSubmit((values) => {
    forgotMutation.mutate(values);
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter your email and we’ll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {forgotMutation.isSuccess ? (
          <p className="text-sm">
            If an account exists for that email, a reset link is on its way. Check your inbox.
          </p>
        ) : (
          <Form {...form}>
            <form onSubmit={(event) => void submit(event)} className="space-y-4" noValidate>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {forgotMutation.isError ? (
                <p className="text-destructive text-sm">{forgotMutation.error.message}</p>
              ) : null}

              <Button type="submit" className="w-full" disabled={forgotMutation.isPending}>
                {forgotMutation.isPending ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>
          </Form>
        )}

        <p className="text-muted-foreground mt-4 text-center text-sm">
          <Link to="/login" className="hover:text-foreground underline underline-offset-4">
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
