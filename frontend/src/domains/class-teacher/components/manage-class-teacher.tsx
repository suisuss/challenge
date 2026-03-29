import * as React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ClassTeacherProps, Teacher } from '@/domains/class/types';
import {
  useAddClassTeacherMutation,
  useLazyGetTeachersQuery,
  useUpdateClassTeacherMutation
} from '../api/class-teacher-api';
import { useGetSectionsQuery } from '@/domains/section/api';
import { useGetClassesQuery } from '@/domains/class/api';

type ManageClassTeacherProps = {
  operation: string;
  id?: string;
  methods: UseFormReturn<ClassTeacherProps>;
};

export const ManageClassTeacher: React.FC<ManageClassTeacherProps> = ({
  operation,
  id,
  methods
}) => {
  const { data, isLoading } = useGetSectionsQuery();
  const { data: classData, isLoading: loadingClasses } = useGetClassesQuery();
  const [getTeachers] = useLazyGetTeachersQuery();
  const [teachers, setTeachers] = React.useState<Teacher[]>([]);
  const [addClassTeacher, { isLoading: addingClassTeacher }] = useAddClassTeacherMutation();
  const [updateClassTeacher, { isLoading: updatingClassTeacher }] = useUpdateClassTeacherMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = methods;

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getTeachers().unwrap();
        if (result.teachers) {
          setTeachers(result.teachers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [getTeachers]);

  const onSubmit = async (data: ClassTeacherProps) => {
    try {
      const result =
        operation === 'Add'
          ? await addClassTeacher(data).unwrap()
          : await updateClassTeacher({ id: id!, ...data }).unwrap();

      toast.info(result.message);
      navigate('/app/class-teachers');
      reset();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  return (
    <>
      <Box component={Paper} sx={{ p: 2 }}>
        <Typography variant='subtitle1' sx={{ mb: 3 }}>
          {operation} Class Teacher
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth size='small' error={Boolean(errors.class)}>
            <InputLabel id='class-name-label' shrink>
              Class Name
            </InputLabel>
            <Controller
              name='class'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    labelId='class-name-label'
                    label='Class Name'
                    value={value}
                    onChange={onChange}
                    notched
                  >
                    {loadingClasses ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                      classData?.classes?.map(({ name }) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel id='demo-controlled-radio-buttons-group' sx={{ mt: 2 }}>
              Sections
            </FormLabel>
            <Controller
              name='section'
              control={control}
              render={({ field }) => (
                <RadioGroup aria-labelledby='demo-controlled-radio-buttons-group' {...field}>
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    data?.sections?.map(({ name }) => (
                      <FormControlLabel
                        key={name}
                        label={name}
                        value={name}
                        control={<Radio size='small' />}
                      />
                    ))
                  )}
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }} size='small'>
            <InputLabel id='teacher-for-dropdown' shrink>
              Teacher
            </InputLabel>
            <Controller
              name='teacher'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    labelId='teacher-for-dropdown'
                    label='Teacher'
                    value={value}
                    onChange={onChange}
                    notched
                  >
                    {teachers.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
          <Box textAlign='center'>
            <LoadingButton
              loading={addingClassTeacher || updatingClassTeacher}
              type='submit'
              size='small'
              variant='contained'
              sx={{ mt: 4 }}
            >
              Save
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </>
  );
};
