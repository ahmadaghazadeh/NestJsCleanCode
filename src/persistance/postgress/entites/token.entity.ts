import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
@Index('tokens_user_id', ['user_id'])
@Index('tokens_token', ['token'], { unique: true })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  public user_id: number;
  @Column()
  public device_model: string;

  @Column()
  public device_os_version: string;

  @Column()
  public token: string;

  @Column()
  public tokenable_type: string;

  @Column()
  public app_version: string;

  @Column()
  public device_os: string;

  @CreateDateColumn({ type: 'timestamp' })
  expires_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  public name: string;
}
